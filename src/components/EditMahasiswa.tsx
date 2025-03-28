import { useCookies } from "react-cookie"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { Mahasiswa } from "@/types/mahasiswa"
export default function EditMahasiswa({ mahasiswa }: { mahasiswa: Mahasiswa }) {
    const [cookies] = useCookies(["auth"])
    const auth = cookies.auth
    const [formData, setFormData] = useState<Mahasiswa>(mahasiswa)
    const URL = import.meta.env.VITE_WD_URL

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
        console.log(formData)
    }

    const handleEdit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const id = mahasiswa.id
        console.log(id)
        try {
            const response = await fetch(`${URL}/mahasiswa/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
                body: JSON.stringify(formData),
            })

            const body = await response.json()

            if (body) {
                window.location.reload()
            }
            console.log(body)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">
                    <p className="font-semibold">Edit</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl font-semibold">
                        Edit
                    </DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nama">Name</Label>
                            <Input
                                onChange={handleChange}
                                id="nama"
                                placeholder="Nurdin"
                                defaultValue={mahasiswa.nama}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nim">NIM</Label>
                            <Input
                                onChange={handleChange}
                                id="nim"
                                placeholder="2025"
                                type="text"
                                defaultValue={mahasiswa.nim}
                            />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button
                        onClick={handleEdit}
                        className="w-full text-secondary cursor-pointer rounded-full"
                    >
                        Edit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
