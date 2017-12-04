import { connect } from 'react-redux';
import MainLayout from 'layouts/MainLayout';
import ProfileInfo from 'modules/ProfileInfo';
import Content from 'components/Content';
import BaseComponent from 'components/BaseComponent';
import PageHeader from 'components/PageHeader';
import checkAuthenticated from 'base/checkAuthenticated';
import './style.less';

class ProfilePage extends BaseComponent {
    render() {
        const clsPrefix = 'p-profile';
        return (
            <MainLayout
                title="南瓜租房 - 个人中心"
            >
                <div className={clsPrefix}>
                    <PageHeader>个人中心</PageHeader>
                    <Content>
                        <ProfileInfo />
                    </Content>
                </div>
            </MainLayout>
        );
    }
}

export default checkAuthenticated(connect()(ProfilePage));
