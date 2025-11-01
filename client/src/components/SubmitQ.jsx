const SubmitQ = ({submitSongAndSinger, isEnabled}) => {
    console.log(isEnabled)
    return (
        <div className="w-full h-fit flex md:justify-center">
          <button
            disabled={!isEnabled}
            onClick={submitSongAndSinger}
            className={`w-full py-3 px-4 rounded-2xl font-semibold text-lg shadow-md transition-all duration-300 ${
              isEnabled
                ? "bg-[#283583] text-white hover:bg-[#3b4eb0] hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Zur Warteliste hinzufügen
          </button>
        </div>
      );
}
export default SubmitQ;