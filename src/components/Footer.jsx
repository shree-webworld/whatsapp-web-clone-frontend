import {Text, Box, Image} from "@chakra-ui/react";


export default function Footer()
{
  return(<>
            <Box bg="green.700" style={{fontFamily: "'Sora', sans-serif"}}>
              <Text color="white" fontSize="lg" textAlign="center" py="1rem" fontWeight="semibold">
                MADE WITH <i className="bi bi-heart-fill" style={{color:"red"}}></i>&nbsp;BY SHREEDHAR
              </Text>
            </Box>
        </>);
}
