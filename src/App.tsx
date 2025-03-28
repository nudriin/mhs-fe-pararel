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
    console.log(URL)

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

            console.log(body)

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

                console.log(body)

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
        <div className="min-h-screen flex flex-col items-center justify-center">
            {!auth && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Username"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="******"
                            type="password"
                        />
                    </div>
                    <Button onClick={login}>Login</Button>
                </div>
            )}
            {auth && (
                <div className="w-9/12 mx-auto mt-10">
                    <div className="flex justify-end mb-10">
                        <AddMahasiswa />
                    </div>
                    <Table>
                        <TableCaption>A list of Mahasiswa.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIM</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {mahasiswa.map((mhs) => (
                            <TableBody key={mhs.id}>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {mhs.id}
                                    </TableCell>
                                    <TableCell>{mhs.nama}</TableCell>
                                    <TableCell>{mhs.nim}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <EditMahasiswa mahasiswa={mhs} />
                                        <DeleteMahasiswa id={mhs.id} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                </div>
            )}
        </div>
    )
}

export default App
