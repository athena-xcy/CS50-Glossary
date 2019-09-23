import { observer, inject } from 'mobx-react';
import Link from 'next/link';
import { Layout, Icon, Button, Row, Col } from 'antd';
import React from 'react';

const { Header, Content, Footer } = Layout;

export default inject()(
    observer(({ children, style }) => {
        return (
            <Layout>
            <Header>
            <Row type="flex" justify="start" gutter={20}>
                <Col>
                    <Link href='/'> 
                        <a style={{ fontSize: '2em', textAlign: 'left', color: '#F8F8F8' }}>
                            <Icon type="build" theme="filled" /> 术语表
                        </a>
                    </Link>
                </Col>
                <Col>
                    <Link href='/glossary'>
                        <Button ghost> 列表</Button>
                    </Link>
                </Col>
                </Row>
            </Header>
            <Content style={{ paddingTop: 50, paddingLeft: 30, paddingRight: 30, ...style }}>{children}</Content>
            <Footer style={{textAlign: 'center'}}></Footer>
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
