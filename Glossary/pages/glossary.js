import { Layout } from 'antd';
import GlossaryForm from '../components/GlossaryForm';

const { Header, Content, Footer } = Layout;

const Glossary = () => (
    <Layout>
        <Header />
        <Content>
            <GlossaryForm {...this.props}/>
        </Content>
        <Footer />
    </Layout>
);
  
export default Glossary;