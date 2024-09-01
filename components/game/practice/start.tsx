import Image, { ImageLoader } from 'next/image'
import gamePic from "./../../../public/practice-nife.png"

const baseUrl = process.env.NEXTAUTH_URL

const imageLoader: ImageLoader = ({ src, width, quality }) => {
    return `${baseUrl}/${src}?w=${width}&q=${quality || 75}`
}

const PracticeStart: React.FC = () => {
    return (<>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <span>Practice</span><br></br>
                <span> Practice Mode</span>
            </div>
            <div>
                <Image loader={imageLoader} width={300} height={300} src={gamePic} alt='Cross nife picture' />
            </div>
        </div>
    </>)
}

export default PracticeStart