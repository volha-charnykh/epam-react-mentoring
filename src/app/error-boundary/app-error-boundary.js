import React from 'react';
import './app-error-boundary.scss';
import Layout from "../../general/components/layout/layout";
import Footer from "../footer/footer";
import Logo from "../../general/components/logo/logo";

export default class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
            <Layout
                footer={
                    <Footer/>
                }>
                <div className="ErrorPage">
                    <Logo/>
                    <div className="ErrorPageTitle">Something went wrong.</div>
                </div>
            </Layout>);
        }

        return this.props.children;
    }
}
