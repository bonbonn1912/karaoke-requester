const SubmitQ = ({submitSongAndSinger}) => {
    return (
        <div className="w-full h-fit flex md:justify-center p-2">
            <button

                onClick={submitSongAndSinger}
                className="bg-green-400 hover:bg-green-600 p-2 rounded-xl md:w-1/2 w-full font-bold text-xl">Zur Wartschlange hinzufügen</button>
        </div>
    )
}
export default SubmitQ;