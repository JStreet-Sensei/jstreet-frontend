import Image from 'next/image'

const NewExpressionStart: React.FC = () => {
    return (<>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <span>New Expression</span><br></br>
                <span> Learning Mode</span>
            </div>
            <div>
                <Image src="../public/new-expression-fox" alt='Fox picture' />
            </div>
        </div>
    </>)
}

export default NewExpressionStart