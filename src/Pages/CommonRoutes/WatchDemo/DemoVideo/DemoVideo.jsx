

const DemoVideo = ({ demoLink }) => {
    return (
        <div className="relative w-[full] overflow-hidden" style={{ paddingTop: '56.25%' }}>
            
            <iframe
                title="YouTube Video"
                className="absolute top-0 left-0 w-full h-full"
                src={demoLink}
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
};

export default DemoVideo;