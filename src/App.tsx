import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table"
import { Mahasiswa } from "./types/mahasiswa"
import { useCookies } from "react-cookie"
import { Button } from "./components/ui/button"
import AddMahasiswa from "./components/AddMahasiswa"
import EditMahasiswa from "./components/EditMahasiswa"
import { Label } from "@radix-ui/react-label"
import { Input } from "./components/ui/input"
import DeleteMahasiswa from "./components/DeleteMahasiswa"

function App() {
    const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([])
    const [cookies, setCookie] = useCookies(["auth"])
    const auth = cookies.auth
    const URL = import.meta.env.VITE_WD_URL

    const login = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const body = await response.json()
            setCookie("auth", JSON.stringify(body.token))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getMahasiswa = async () => {
            try {
                const response = await fetch(`${URL}/mahasiswa`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                })
                const body = await response.json()
                setMahasiswa(body.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (auth) {
            getMahasiswa()
        }
    }, [auth, URL])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
            {!auth && (
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <h2 className="text-2xl font-bold text-center mb-8 ">
                        Student Portal Login
                    </h2>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Username
                            </Label>
                            <Input
                                id="username"
                                className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>
                        <Button
                            onClick={login}
                            className="w-full h-12 rounded-xl text-lg font-semibold text-white shadow-md transition-all duration-300"
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            )}

            {auth && (
                <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-10">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Student Database</h2>
                        <AddMahasiswa />
                    </div>
                    <Table className="border-collapse w-full">
                        <TableCaption className="mt-4 text-gray-500">
                            Total of {mahasiswa.length} students registered
                        </TableCaption>
                        <TableHeader className="bg-gray-50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[100px] py-4 text-gray-600 font-semibold border-b border-gray-200">
                                    ID
                                </TableHead>
                                <TableHead className="text-gray-600 font-semibold border-b border-gray-200">
                                    Name
                                </TableHead>
                                <TableHead className="text-gray-600 font-semibold border-b border-gray-200">
                                    Student ID
                                </TableHead>
                                <TableHead className="text-right py-4 text-gray-600 font-semibold border-b border-gray-200">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mahasiswa.map((mhs) => (
                                <TableRow
                                    key={mhs.id}
                                    className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100"
                                >
                                    <TableCell className="font-medium text-gray-700 py-4">
                                        #{mhs.id}
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {mhs.nama}
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {mhs.nim}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2 py-4">
                                        <EditMahasiswa mahasiswa={mhs} />
                                        <DeleteMahasiswa id={mhs.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default App
