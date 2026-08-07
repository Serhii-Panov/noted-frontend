import ReactPaginate from "react-paginate";

interface PaginationProps {
currentPage: number;
totalPages: number;
onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination(props: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={props.totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={props.onPageChange}
            forcePage={props.currentPage - 1}
            containerClassName="flex justify-center gap-1 mx-4 my-0 list-none p-0"
            pageClassName="border rounded-sm cursor-pointer min-w-[36px] h-[36px] transition-colors duration-200 ease-in-out hover:bg-[#e9ecef] actice:hover:bg-[#0d6efd]  "
            pageLinkClassName="flex items-center justify-center w-full h-full text-blue-500 text-sm"
            activeClassName="active"
            activeLinkClassName="bg-[#0d6efd] text-white hover:bg-[#0b5ed7]"
            breakClassName="border rounded-sm cursor-pointer min-w-[36px] h-[36px] transition-colors duration-200 ease-in-out hover:bg-[#e9ecef]"
            breakLinkClassName="flex items-center justify-center w-full h-full text-blue-500 text-sm"
            disabledClassName="opacity-50 cursor-not-allowed"
            nextClassName="border rounded-sm cursor-pointer min-w-[36px] h-[36px] transition-colors duration-200 ease-in-out hover:bg-[#e9ecef]"
            nextLinkClassName="flex items-center justify-center w-full h-full text-blue-500 text-sm"
            previousClassName="border rounded-sm cursor-pointer min-w-[36px] h-[36px] transition-colors duration-200 ease-in-out hover:bg-[#e9ecef]"
            previousLinkClassName="flex items-center justify-center w-full h-full text-blue-500 text-sm"
            nextLabel="→"
            previousLabel="←"
            />
    );
}
