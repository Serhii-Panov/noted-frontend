import { Flex, Text, Button, Container, Box } from "@radix-ui/themes";
import Header from "@/components/HeaderNew/Header";
const TestPage = () => {
  return (
    <Box>
      <Header />
      <Container size="3">
        <Flex
          direction="column"
          gap="2"
          justify="center"
          align="center"
          style={{ height: "80vh" }}
        >
          <Text size="5">Test Page</Text>
          <Button>Test Button</Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default TestPage;
