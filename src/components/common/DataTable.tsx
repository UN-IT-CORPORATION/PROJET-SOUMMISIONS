import * as React from "react"
import { useTranslation } from "react-i18next"
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string
    searchPlaceholder?: string
    rightActions?: React.ReactNode
    topRightAction?: React.ReactNode
    dateFilterAction?: React.ReactNode
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = "datatable.search_placeholder",
    rightActions,
    topRightAction,
    dateFilterAction,
}: DataTableProps<TData, TValue>) {
    const { t } = useTranslation()

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize
    const totalRows = table.getFilteredRowModel().rows.length
    const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1
    const endRow = totalRows === 0 ? 0 : Math.min(totalRows, (pageIndex + 1) * pageSize)
    const pageCount = table.getPageCount()
    const currentPage = pageIndex + 1
    const paginationRange = React.useMemo<(number | "dots")[]>(() => {
        if (pageCount <= 1) {
            return [1]
        }

        const delta = 1
        const range: number[] = []

        for (let page = 1; page <= pageCount; page++) {
            if (page === 1 || page === pageCount || (page >= currentPage - delta && page <= currentPage + delta)) {
                range.push(page)
            }
        }

        const rangeWithDots: (number | "dots")[] = []
        let previous: number | undefined

        for (const page of range) {
            if (previous !== undefined) {
                if (page - previous === 2) {
                    rangeWithDots.push(previous + 1)
                } else if (page - previous > 2) {
                    rangeWithDots.push("dots")
                }
            }

            rangeWithDots.push(page)
            previous = page
        }

        return rangeWithDots
    }, [currentPage, pageCount])

    const goToPage = (pageNumber: number) => {
        table.setPageIndex(pageNumber - 1)
    }

    return (
        <div className="w-full space-y-4">
            {/* Search + Top Right Action */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                {searchKey && (
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t(searchPlaceholder, { defaultValue: searchPlaceholder })}
                            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
                            className="w-full bg-white pl-9 md:w-[307px] lg:w-[407px]"
                        />
                    </div>
                )}
                {topRightAction && (
                    <div className="flex items-center">
                        {topRightAction}
                    </div>
                )}
            </div>

            {/* Filters + Column visibility */}
            {(rightActions || table.getAllColumns().filter((col) => col.getCanHide()).length > 0) && (
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {rightActions}
                    </div>
                    <div className="flex items-center gap-2">
                        {dateFilterAction}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="cursor-pointer">
                                    {t("datatable.columns")}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((col) => col.getCanHide())
                                    .map((col) => (
                                        <DropdownMenuCheckboxItem
                                            key={col.id}
                                            className="capitalize cursor-pointer"
                                            checked={col.getIsVisible()}
                                            onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                        >
                                            {t(`datatable.column_labels.${col.id}`, { defaultValue: col.id })}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <Table>
                    <TableHeader className="uppercase">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="uppercase">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="data-[state=selected]:bg-white"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {t("datatable.no_results")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination controls */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-muted-foreground">
                    {t("datatable.display", { start: startRow, end: endRow, total: totalRows })}
                </p>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{t("datatable.rows_per_page")}</p>
                        <Select value={`${pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
                            <SelectTrigger className="h-8 w-[70px] bg-white cursor-pointer">
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 25, 50].map((size) => (
                                    <SelectItem key={size} value={`${size}`} className="cursor-pointer">
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-white text-muted-foreground transition-colors hover:text-primary hover:border-primary disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-50 disabled:hover:border-border cursor-pointer"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            aria-label={t("datatable.previous_page")}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">{t("datatable.pagination_left")}</span>
                        </button>
                        {paginationRange.map((item, index) =>
                            item === "dots" ? (
                                <span key={`dots-${index}`} className="px-2 text-sm font-medium text-muted-foreground">
                                    ...
                                </span>
                            ) : (
                                <button
                                    type="button"
                                    key={item}
                                    className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors cursor-pointer ${item === currentPage
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border bg-white text-muted-foreground hover:text-primary hover:border-primary"
                                        }`}
                                    onClick={() => goToPage(item)}
                                    aria-current={item === currentPage ? "page" : undefined}
                                >
                                    {item}
                                </button>
                            )
                        )}
                        <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-white text-muted-foreground transition-colors hover:text-primary hover:border-primary disabled:cursor-not-allowed disabled:text-muted-foreground disabled:opacity-50 disabled:hover:border-border cursor-pointer"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            aria-label={t("datatable.next_page")}
                        >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">{t("datatable.pagination_right")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
