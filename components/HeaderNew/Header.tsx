import {Flex, Text, Button, Container, TabNav, Box} from "@radix-ui/themes"
import AuthNav from "../AuthNavigation/AuthNavigation";

const Header = () => {
  return (
    <header>
      <Container size="3">
        <Flex justify="between" align="center" py="4">
          <Text weight="bold" size="6">
            Noted
          </Text>
          <Flex gap="3">
          <TabNav.Root color="orange">
            <TabNav.Link href="/">Home</TabNav.Link>
            <TabNav.Link href="/notes/filter/all">Notes</TabNav.Link>
          </TabNav.Root>
          <AuthNav />
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
