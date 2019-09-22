import { Row, Col, Icon, Button } from 'antd';
import Layout from '../components/Layout'
import GlossarySearch from '../components/GlossarySearch'
import GlossaryForm from '../components/GlossaryForm';

const Index = () => (
    <Layout style={{ paddingTop: 100, paddingLeft: 30, paddingRight: 30 }}>
        <Row>
            <Col 
            xs={{ span: 24 }} 
            sm={{ span: 24 }}
            md={{ span: 16, offset: 4 }} 
            lg={{ span: 16, offset: 4 }} 
            xl={{ span: 16, offset: 4 }}>
                <GlossarySearch />
            </Col>
        </Row>
        <Row style={{ height: 50 }}/>
        <Row>
            <Col span={20} offset={2}><GlossaryForm /></Col>
        </Row>
    </Layout>

    
);

Index.getInitialProps = async function({store: {glossaryStore}}) {
    glossaryStore.getAllGlossaries();
    return {};
}
  
export default Index;
