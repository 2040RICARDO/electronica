import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div classNameName="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <form onSubmit={submit}>
                <div className="flex items-center justify-center h-screen">

                    <div className="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
                        <div className="mb-8 flex justify-center">
                        <img className="w-24" src="assets/imagen/logoe.png" alt="" />
                        </div>
                        <div className="flex flex-col text-sm rounded-md">
                        <div>
                        <InputLabel htmlFor="email" value="Correo" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                        </div>
                        <button className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit">Ingresar</button>
                        <div className="mt-5 flex justify-between text-sm text-gray-600">

                        <a href={route('welcome')}>Principal</a>
                        </div>

                        <div className="mt-5 flex justify-center gap-3    ">

                        </div>
                        <div className="mt-5 flex text-center text-sm text-gray-400">
                        <p>
                            Ingrese su usuario y contraseña para ingresar al sistema 
                        </p>
                        </div>
                    </div>
                </div>
            </form>
            
        </GuestLayout>
    );
}
