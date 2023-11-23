const SubmitQ = ({submitSongAndSinger, isEnabled}) => {
    console.log(isEnabled)
    return (
        <div className="w-full h-fit flex md:justify-center p-2">
            <button
                disabled={!isEnabled}
                onClick={submitSongAndSinger}
                className={`hover:bg-gray-700 p-2 rounded-xl md:w-1/2 w-full font-bold text-xl text-white ${isEnabled ? 'bg-gray-600 hover:bg-gray-300' : 'bg-gray-500'}`}>{
                "Zur Warteliste hinzufügen"
            }</button>
        </div>
    )
}
export default SubmitQ;