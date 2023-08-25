import { Navbar } from "../../Components/Navbar/Navbar";
import { RecordedVideoCard } from "../../Components/RecordedVideoCard/RecordedVideoCard";
import { VideoRecorder } from "../../Components/VideoRecorder/VideoRecorder";
import { useRecordings } from "../../Context/recordingContext";

export const Home = () => {
  const {
    recordings: { recordings },
  } = useRecordings();
  return (
    <div>
      <Navbar />
      Home
      <VideoRecorder />
      <div
        className="recorded-videos"
        style={{ display: "flex", flexDirection: "row", gap: "20px",flexWrap:"wrap" }}
      >
        {recordings.map((props) => (
          <RecordedVideoCard key={props.id} {...props} />
        ))}
      </div>
    </div>
  );
};
