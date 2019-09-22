import { Layout, Row, Col, Card } from 'antd';
import GlossarySearch from '../components/GlossarySearch'
import GlossaryForm from '../components/GlossaryForm';

const { Header, Content, Footer } = Layout;

const Index = () => (
    <Layout>
        <Header />
        <Content>
            <div style={{ marginTop: '10%', marginBottom: 'auto' }}>
                <Row>
                    <Col 
                    xs={{ span: 20, offset: 2 }} 
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 16, offset: 4 }} 
                    lg={{ span: 12, offset: 6 }} 
                    xl={{ span: 12, offset: 6 }}>
Hellp
                        <GlossarySearch />
                    </Col>
                </Row>
                <Row style={{ height: 50 }}/>
                <Row>
                <Col 
                    xs={{ span: 20, offset: 2 }} 
                    sm={{ span: 20, offset: 2 }}
                    md={{ span: 16, offset: 4 }} 
                    lg={{ span: 16, offset: 4 }} 
                    xl={{ span: 16, offset: 4 }}>
                        <GlossaryForm />
                    </Col>
                </Row>
            </div>
        </Content>
        <Footer />
        <style>
            {`
                body, #__next, .ant-layout, .ant-layout-content {
                    height: 100%;
                }
            `}
        </style>
    </Layout>
);

Index.getInitialProps = async function({store: {glossaryStore}}) {
    glossaryStore.getAllGlossaries();
    return {};
}
  
export default Index;
