import Layout from '../components/Layout';
import GlossaryTable from '../components/GlossaryTable';

const Glossary = () => (
    <Layout>
        <GlossaryTable/>
    </Layout>
);

Glossary.getInitialProps = async function({store: {glossaryStore}}) {
    glossaryStore.getAllGlossaries();
    return {};
}
  
export default Glossary;