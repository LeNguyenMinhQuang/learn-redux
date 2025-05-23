import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserTable from "./UserTable";
import PostTable from "./PostTable";
import Count from "./Count";

function MyTab() {
    return (
        <Tabs
            defaultActiveKey="user"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
        >
            <Tab eventKey="user" title="Users">
                <UserTable />
            </Tab>
            <Tab eventKey="blog" title="Blogs">
                <PostTable />
            </Tab>
            <Tab eventKey="count" title="Count">
                <Count />
            </Tab>
            <Tab eventKey="user-saga" title="UsersSaga">
                UserSaga
            </Tab>
            <Tab eventKey="blog-saga" title="BlogsSaga">
                BlogSaga
            </Tab>
        </Tabs>
    );
}

export default MyTab;
