import React, { useEffect, useRef, useState } from "react";
import { BsCameraVideoOff, BsCameraVideo } from "react-icons/bs";
import { useRecordings } from "../../Context/recordingContext";
import "./VideoRecorder.css";

const constraints = { video: { width: { max: 320 } }, audio: true };

export const VideoRecorder = () => {
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const videoRef = useRef(null);

  const {
    recordings: { recordings },
    dispatchRecording,
  } = useRecordings();

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorderRef.current.start();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startVideo(); // Automatically start the camera preview
      setIsRecording(true);
      videoRef.current.play();
    } else {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      setIsRecording(false);
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        mimeType: "video/webm;codecs=vp9,opus",
      });
      dispatchRecording({
        type: "ADD_RECORDING",
        payload: {
          id: recordings.length,
          vid: blob,
        },
      });
      setRecordedChunks(() => []);
    }
  }, [isRecording, recordedChunks]);

  useEffect(() => {
    console.log(recordings);
  }, [recordings]);

  return (
    <div className="videoRecorder">
      <video ref={videoRef} />

      <div className="controls">
        <button onClick={toggleRecording}>
          {isRecording ? <BsCameraVideoOff /> : <BsCameraVideo />}
        </button>
      </div>

      {/* {recordedChunks.length > 0 && (
        <div className="download">
          <a
            href={URL.createObjectURL(
              new Blob(recordedChunks, {
                mimeType: "video/webm;codecs=vp9,opus",
              })
            )}
            download="recorded-video.webm"
          >
            Download Recorded Video
          </a>
          <video controls>
            <source
              src={URL.createObjectURL(
                new Blob(recordedChunks, {
                  mimeType: "video/webm;codecs=vp9,opus",
                })
              )}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )} */}
    </div>
  );
};
