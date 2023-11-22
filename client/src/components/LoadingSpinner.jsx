const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center mt-5">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid"></div>
        </div>
    );
};

export default LoadingSpinner;