import { useUserActions } from "@/hooks/useUserActions";
import { Button } from "./ui/button";
import { Card, CardAction, CardDescription, CardTitle } from "./ui/card";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function CreateNewUser() {
    const { addUser } = useUserActions();
    const [result, setResult] = useState<'ok' | 'ko' | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setResult(null);

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const github = formData.get("github") as string;

        if (!name || !email || !github) {
            setResult('ko');
            return;
        }

        addUser({ name, email, github });
        setResult('ok');
        form.reset();
    };

    return (
        <Card className="mt-6 p-6">
            <CardTitle>Crear Nuevo Usuario</CardTitle>
            <CardDescription>
                Agrega un nuevo usuario llenando el siguiente formulario.
            </CardDescription>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <Field>
                    <FieldLabel htmlFor="name">Nombre</FieldLabel>
                    <Input id="name" name="name" type="text" placeholder="Ingresa el nombre completo" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" name="email" type="email" placeholder="Ingresa el correo electrónico" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="github">GitHub</FieldLabel>
                    <Input id="github" name="github" type="text" placeholder="Ingresa el nombre de usuario de GitHub" />
                </Field>
                <CardAction className="flex justify-end">
                    <Button type="submit">Crear Usuario</Button>
                    <span>
                        {result === 'ok' && toast.success('Usuario creado con éxito!')}
                        { result === 'ko' && toast.error('Error: Por favor completa todos los campos.') }
                        </span>
                </CardAction>
            </form>
                    
        </Card>
    );
}