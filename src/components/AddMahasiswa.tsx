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
import { MahasiswaAddRequest } from "../types/mahasiswa"
import { useCookies } from "react-cookie"

export default function AddMahasiswa() {
    const [formData, setFormData] = useState<MahasiswaAddRequest>({
        nama: "Nurdin",
        nim: "213130503177",
    })
    const [cookies] = useCookies(["auth"])
    const auth = cookies.auth
    const URL = import.meta.env.VITE_WD_URL

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
        console.log(formData)
    }

    const handleAdd = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${URL}/mahasiswa`, {
                method: "POST",
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
                <Button className="flex items-center justify-center h-full gap-2 group hover:border-primary hover:cursor-pointer text-secondary rounded-full">
                    <p className="font-semibold">Add</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl font-semibold">
                        Add Mahasiswa
                    </DialogTitle>
                    <DialogDescription>
                        Add new Mahasiswa to the server
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nama">Nama</Label>
                            <Input
                                onChange={handleChange}
                                id="nama"
                                placeholder="Nurdin"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="nim">NIM</Label>
                            <Input
                                onChange={handleChange}
                                id="nim"
                                placeholder="nurdin"
                                type="number"
                            />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button
                        onClick={handleAdd}
                        className="w-full text-secondary rounded-full cursor-pointer"
                        type="submit"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
