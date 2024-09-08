import dynamic from 'next/dynamic'
import GameStateProvider from '../../components/context/GameStateProvider'
import SocketProvider from '../../components/context/SocketProvider'
import GamePair from '../../components/GamePair'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { CardData, ClientGameState, ServerLobby } from '@/types/game'
import { getSession } from 'next-auth/react'
import Message from '@/components/game/findPairGame/Message'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const FindPair = () => {
  // Socket or state
  const [useSocket, setSocket] = useState<Socket>({} as Socket)
  const [useClientGameState, setClientGameState] = useState<ClientGameState>(
    {} as ClientGameState
  )
  const [useServerLobby, setServerLobby] = useState<ServerLobby>(
    {} as ServerLobby
  )
  //Message state
  const [useMessage, setMessage] = useState('')

  // State if game is ready or not
  const [isGameStateReady, setGameStateReady] = useState(false)
  const [isSocketReady, setSocketReady] = useState(false)

  // Initialize game state
  useEffect(() => {
    console.log('Initilialize gameState')
    setGameStateReady(false)

    getSession().then((session) => {
      const username = session?.user.username || 'Player'
      const user_id = session?.user.pk || 0
      setClientGameState({ username, user_id, cardDeck: [], turn: 0 })
    })
  }, [])

  useEffect(() => {
    console.log('Client game state ready')
    console.log(useClientGameState)
    setGameStateReady(true)
  }, [useClientGameState])

  // Initilialize socket after the gameState
  useEffect(() => {
    if (isGameStateReady && useClientGameState.username !== undefined) {
      const newSocket: Socket = io({
        query: {
          user_id: useClientGameState.user_id,
          username: useClientGameState.username,
          lobby_id: 1,
        },
        path: '/api/socket',
      })

      newSocket.on('connect', () => {
        console.log('Connected to server')
      })

      newSocket.on('start', () => {
        console.log('Game is started')
      })

      newSocket.on('join', (receivedLobby: ServerLobby) => {
        receivedLobby.players = new Set(receivedLobby.players)
        console.log('New player joined the lobby', receivedLobby.players)
        setServerLobby(receivedLobby)
        setClientGameState({
          ...useClientGameState,
          cardDeck: receivedLobby.gameState.cardDeck,
          turn: receivedLobby.gameState.turn,
        })
      })

      newSocket.on('left', (receivedLobby: ServerLobby) => {
        console.log('A player left the lobby', receivedLobby.players)
        setServerLobby(receivedLobby)
      })

      // Get the update of the deck
      newSocket.on(
        'receive-game-update',
        (cardDeck: CardData[], turn: number) => {
          console.log('Received an update, turn: ', turn)
          setMessage(`Received a deck update...`)
          setClientGameState({ ...useClientGameState, cardDeck, turn })
        }
      )

      newSocket.on('message', (message: string) => {
        setMessage(message)
      })

      newSocket.on('change-turn', (receivedLobby: ServerLobby) => {
        receivedLobby.players = new Set(receivedLobby.players)
        console.log(
          'Time to change turn! Now is ',
          receivedLobby.gameState.turn
        )
        // Wait 1 seconds before change turn!
        new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
          setMessage(`Change turn to ${receivedLobby.gameState.turn}`)
          // This update the score
          setServerLobby(receivedLobby)
          // This update the deck and the turn
          setClientGameState({
            ...useClientGameState,
            turn: receivedLobby.gameState.turn,
            cardDeck: receivedLobby.gameState.cardDeck,
          })
        })
      })

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server')
      })

      setSocket(newSocket)
      setSocketReady(true)

      return () => {
        newSocket.disconnect()
      }
    } else setGameStateReady(false)
  }, [isGameStateReady])

  // Get the update from the child and emit to every client!
  const handleUpdateDeck = (cardDeck: CardData[]) => {
    console.log('Handle update', cardDeck)
    setClientGameState({ ...useClientGameState, cardDeck })
    console.log('Send update to server')
    useSocket.emit('send-game-update', cardDeck, useClientGameState.user_id)
  }

  if (
    !isGameStateReady ||
    !isSocketReady ||
    useClientGameState.cardDeck.length === 0
  ) {
    return (
      <div>
        <h1>Please wait...</h1>
        <p>The game is still loading...</p>
      </div>
    )
  }

  return (
    <div>
      <SocketProvider parentSocket={useSocket}>
        <GameStateProvider parentGameState={useClientGameState}>
          <Message message={useMessage}></Message>
          <GamePair
            players={useServerLobby.players}
            gameState={useClientGameState}
            handleUpdateDeck={handleUpdateDeck}
          ></GamePair>
        </GameStateProvider>
      </SocketProvider>
    </div>
  )
}

export default dynamic(() => Promise.resolve(FindPair), {
  ssr: false,
})
