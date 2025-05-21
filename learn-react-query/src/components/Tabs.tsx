import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserTable from "./UserTable";

function UncontrolledExample() {
    return (
        <Tabs
            defaultActiveKey="user"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3"
        >
            <Tab eventKey="user" title="Users">
                <UserTable />
            </Tab>
            <Tab eventKey="blog" title="Blogs"></Tab>
        </Tabs>
    );
}

export default UncontrolledExample;
