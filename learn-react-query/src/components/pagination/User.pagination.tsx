import Pagination from "react-bootstrap/Pagination";

interface IProps {
    totalPages: number;
    page: number;
    setPage: (a: number) => void;
}

function UserPagination({ totalPages, page, setPage }: IProps) {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i == page}
                onClick={() => setPage(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => {
                    setPage(page == 1 ? page : page - 1);
                }}
                disabled={page == 1}
            />
            {items}
            <Pagination.Next
                onClick={() => {
                    setPage(page == totalPages ? page : page + 1);
                }}
                disabled={page == totalPages}
            />
        </Pagination>
    );
}

export default UserPagination;
