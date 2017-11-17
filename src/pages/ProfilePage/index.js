import { connect } from 'react-redux';
import MainLayout from 'layouts/MainLayout';
import ProfileInfo from 'modules/ProfileInfo';
import Content from 'components/Content';
import BaseComponent from 'components/BaseComponent';
import PageHeader from 'components/PageHeader';
import './style.less';

class ProfilePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleChangePasswd', 'handleChangePhone');
    }

    handleChangePasswd() {
        console.log(this);
    }

    handleChangePhone() {
        console.log(this);
    }

    render() {
        const clsPrefix = 'p-profile';
        return (
            <MainLayout>
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

export default connect()(ProfilePage);
