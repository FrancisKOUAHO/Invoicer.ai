'use client'


import { useState, useEffect } from 'react';
import CustomerModal from "@/app/(landing)/components/modal/customer/CustomerModal";
import SirenModal from "@/app/(landing)/components/modal/customer/SirenModal";
import DeleteCustomer from "@/app/(landing)/components/modal/customer/DeleteCustomer"; // Assurez-vous d'importer correctement le chemin
import { fetchClientDetails, deleteClient } from "@/app/services/customer";
import {Client} from '@/app/models/Client';
import {
    Calendar,
    CirclePlus,
    FileImage,
    MoreHorizontal,
    Tags,
    Trash,
    Edit,
    User,
} from 'lucide-react'
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Page = () => {
    const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
    const [isSirenModalOpen, setSirenModalOpen] = useState(false);
    const [customerData, setCustomerData] = useState<Client | null>(null);
    const [clients, setClients] = useState<Client[]>([]);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [clientIdToDelete, setClientIdToDelete] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const loadClients = async () => {
            try {
                const clientData = await fetchClientDetails();
                setClients(clientData);
            } catch (error) {
            }
        };

        loadClients();
    }, []);

    const handleSirenSubmit = (sirenData: Client | null = null) => {
        setCustomerData(sirenData);
        setSirenModalOpen(false);
        setCustomerModalOpen(true);
    };

    const openCustomerModal = (client: Client | null = null) => {
        if (client) {
            // Update mode with client data
            setCustomerData(client);
            setIsUpdating(true);
        } else {
            // Insert mode, no initial data
            setCustomerData(null);
            setIsUpdating(false);
        }
        setCustomerModalOpen(true);
    };

    const openSirenModal = () => {
        setSirenModalOpen(true);
    };

    const closeCustomerModal = () => {
        setCustomerModalOpen(false);
    };

    const onAddClient = (client: Client, isUpdating: boolean) => {
        if (isUpdating) {
            setClients(prevClients => prevClients.map(c => c.id === client.id ? client : c));
        } else {
            setClients(prevClients => [...prevClients, client]);
        }
    };

    const toggleDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const openDeleteModal = (clientId: string) => {
        setClientIdToDelete(clientId);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            if (clientIdToDelete) {
                await deleteClient(clientIdToDelete);
                setClients(clients => clients.filter(client => client.id !== clientIdToDelete));
                setDeleteModalOpen(false);
                setClientIdToDelete(null);
            }
        } catch (error) {
        }
    };
    const formatDate = (dateString:String) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    return (
        <section className="px-6 py-6">
            <header className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-12">
                    <h5 className="text-black text-lg font-semibold">Clients</h5>
                    <div>
                        <button onClick={openSirenModal} style={{display: 'flex', gap: '5px'}}>
                            Ajouter un client
                            <CirclePlus className="w-3 h-3"/>
                        </button>
                        <SirenModal isOpen={isSirenModalOpen} onClose={() => setSirenModalOpen(false)}
                                    onSirenSubmit={handleSirenSubmit}/>
                        <CustomerModal
                            isOpen={isCustomerModalOpen}
                            onClose={closeCustomerModal}
                            initialData={customerData}
                            onAddClient={onAddClient}
                            isUpdating={isUpdating}
                        />

                        {/*<CustomerModal isOpen={isCustomerModalOpen} onClose={closeCustomerModal} initialData={customerData} onAddClient={onAddClient} />*/}
                    </div>
                </div>
                <div className="relative text-gray-600">
                    <input
                        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search"
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                        <svg
                            className="text-gray-600 h-4 w-4 fill-current"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.966 56.966"
                            xmlSpace="preserve"
                            width="512px"
                            height="512px"
                        >
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                        </svg>
                    </button>
                </div>
            </header>

            <div className="mt-6">
                <table className="table w-full text-black border-separate space-y-6 text-sm">
                    <thead>
                    <tr>
                        <th className="p-3 text-center">Nom</th>
                        <th className="p-3 text-center">Entreprise</th>
                        <th className="p-3 text-center">Date d'ajout</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="bg-[#e7effc]">
                            <td className="p-3 text-center">{client.first_name} {client.last_name}</td>
                            <td className="p-3 text-center">{client.company}</td>
                            <td className="p-3 text-center">{formatDate(client.created_at)}</td>
                            <td className="p-3 text-center">
                                <DropdownMenu open={openDropdownId === client.id}
                                              onOpenChange={() => toggleDropdown(client.id)}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => openDeleteModal(client.id)}>
                                                <Trash className="mr-2 h-4 w-4"/>
                                                Supprimer
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => openCustomerModal(client)}>
                                                <Edit className="mr-2 h-4 w-4"/>
                                                Modifier
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <DeleteCustomer
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </section>
    );
}

export default Page;
