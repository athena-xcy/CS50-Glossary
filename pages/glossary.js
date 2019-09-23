import Layout from '../components/Layout';
import GlossaryTable from '../components/GlossaryTable';

const Glossary = () => (
    <Layout>
        <GlossaryTable/>
    </Layout>
);

Glossary.getInitialProps = async function({store: {glossaryStore}}) {
    return {};
}
  
export default Glossary;