import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

import { useQueryClient } from "@tanstack/react-query";
import type { IUser } from "./UserTable";
import { QUERY_KEY } from "../query/user.query";

function Header() {
    // c1: share data qua các component - vì cái này là gọi là useQuery kìa nên nó sẽ có vấn đề, header được render trước bảng bên dưới, nên cái query kia chưa có data, nên ưu tiên dùng cách 2
    const queryClient = useQueryClient();
    const data =
        (queryClient?.getQueryData(QUERY_KEY.getUserPaginate(1)) as {
            users: IUser[];
            total: number;
        }) ?? [];
    // c2: dùng useQuery (không sợ bị gọi lại vì react query sẽ tự tối ưu)
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    Learn Redux - users: {data?.total}
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Form.Check
                        onChange={() => {}}
                        type="switch"
                        id="custom-switch"
                        label={"light"}
                        defaultChecked={false}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
