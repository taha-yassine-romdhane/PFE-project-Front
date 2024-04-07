import React from "react";
import { Progress, Box, Flex, Text } from "@chakra-ui/react";
import { FiFolder } from "react-icons/fi";

const FolderProgressWidget = ({ progress }) => {
  return (
    <Box p="4" bg="white" boxShadow="md" borderRadius="md" mb="4">
      <Flex alignItems="center" mb="2">
        <Box as={FiFolder} fontSize="xl" color="gray.500" mr="2" />
        <Text fontSize="lg" fontWeight="semibold">
          Folder Progress
        </Text>
      </Flex>
      <Progress value={progress} colorScheme="blue" size="md" />
      <Text fontSize="sm" mt="2">
        {progress}% completed
      </Text>
    </Box>
  );
};

export default FolderProgressWidget;
