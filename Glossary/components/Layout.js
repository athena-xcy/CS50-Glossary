import { observer, inject } from 'mobx-react';
import Link from 'next/link';
import { Layout, Icon } from 'antd';
import React from 'react';

const { Header, Content, Footer } = Layout;

export default inject()(
    observer(({ children, style }) => {
        return (
            <Layout>
            <Header>
                <Link href='/'> 
                    <a style={{ fontSize: '2em', textAlign: 'left', color: '#F8F8F8' }}>
                        <Icon type="build" theme="filled" /> 术语表
                    </a>
                </Link>
            </Header>
            <Content style={style}>{children}</Content>
            <Footer style={{textAlign: 'center'}}>Powered by CS50</Footer>
            <style>{`
                #__next {
                    height: 100%;
                }
                .ant-layout {
                    min-height: 100%;
                }
            `}</style>
            </Layout>
        );
    }
));
