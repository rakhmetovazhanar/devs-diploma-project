    
import { Grid, Box, Heading } from "@chakra-ui/react"
import { useContext } from "react"
import { SocketContext } from "./SocketContext"
import {useEffect} from 'react';

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)


    useEffect(() => {
      if (stream) {
          myVideo.current.srcObject = stream;
      }
  }, [stream, myVideo]);

return (
    <Grid justifyContent="center" templateColumns='repeat(2, 1fr)' mt="12">
        {
            stream && (
                <Box>
                    <Grid colSpan={1}>
                        <Heading as="h5">
                            {name || 'Name'}
                        </Heading>
                          <video playsInline muted ref={myVideo} autoPlay width="600" style={{ transform: 'scaleX(-1)' }} />
                    </Grid>
                </Box>
            )
        }
        {
            callAccepted && !callEnded && (
                <Box>
                    <Grid colSpan={1}>
                        <Heading as="h5">
                            {call.name || 'Name'}
                        </Heading>
                        <video playsInline ref={userVideo} autoPlay width="600" />
                    </Grid>
                </Box>
            )
        }
    </Grid>
)
}
    export default VideoPlayer
