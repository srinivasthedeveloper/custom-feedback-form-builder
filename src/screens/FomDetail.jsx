import { Accordion, Card, Flex, Image, Text } from '@mantine/core';
import { AdminHeader } from '../components/AdminHeader';

const FormDetail = () => {
  return (
    <section>
      <AdminHeader />
      <main>
        <Card shadow="md" style={{ margin: '20px', padding: '0 0 20px' }}>
          <Flex style={{ background: '#5578F4', color: 'white', padding: '10px' }}>
            <Flex>
              <Image />
              <Text>Generic Website Rating</Text>
            </Flex>
            <Text>Created date: 02/05/2024</Text>
          </Flex>
          <Flex direction="column" style={{ padding: '20px' }}>
            <Flex>
              <Flex>
                <Text>40</Text>
                <Text>Views</Text>
              </Flex>
              <Flex>
                <Text>40</Text>
                <Text>Views</Text>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text>Page URL contains example.com/about</Text>
              <Text>Page URL contains example.com/about</Text>
              <Text>Page URL contains example.com/about</Text>
            </Flex>
            <Flex direction="column">
              <Text>Feedback List</Text>
              <Accordion style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Accordion.Item key={'0'} value={'0'} style={{ boxShadow: '0px 0px 5px #aaa' }}>
                  <Accordion.Control>
                    <Flex>
                      <Text>Feedback 1</Text>
                      <Flex>10/08/2024</Flex>
                    </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Flex direction="column">
                      <Text>Would you like to add a comment?</Text>
                      <Text>
                        The website is user-friendly and easy to navigate. I found exactly what I was looking for
                        without any hassle. The checkout process was quick, and I appreciate the seamless online
                        shopping experience.
                      </Text>
                    </Flex>
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item key={'1'} value={'1'} style={{ boxShadow: '0px 0px 5px #aaa' }}>
                  <Accordion.Control>
                    <Flex>
                      <Text>Feedback 1</Text>
                      <Flex>10/08/2024</Flex>
                    </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Flex direction="column">
                      <Text>Would you like to add a comment?</Text>
                      <Text>
                        The website is user-friendly and easy to navigate. I found exactly what I was looking for
                        without any hassle. The checkout process was quick, and I appreciate the seamless online
                        shopping experience.
                      </Text>
                    </Flex>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Flex>
          </Flex>
        </Card>
      </main>
    </section>
  );
};
export { FormDetail };
