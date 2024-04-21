'use client'

import {
  Calendar,
  CirclePlus,
  FileImage,
  MoreHorizontal,
  Tags,
  Trash,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const labels = [
  'feature',
  'bug',
  'enhancement',
  'documentation',
  'design',
  'question',
  'maintenance',
]

const Page = () => {
  const [label, setLabel] = useState('feature')
  const [open, setOpen] = useState(false)

  function closeAndFocusTrigger(triggerId: string) {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(triggerId)?.focus()
    })
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle checkbox change logic here
  }

  return (
    <section className="px-6 py-6">
      <header className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-12">
          <h5 className="text-black text-lg font-semibold">Invoices</h5>
          <a
            href="/"
            className="flex justify-center gap-1 items-center text-black text-sm"
          >
            <CirclePlus className="w-3 h-3" />
            Create
          </a>
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
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="mt-6">
        <table className="table w-full text-black border-separate space-y-6 text-sm">
          <thead>
            <tr>
              <th className="flex items-center gap-2 p-3 text-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                <Label
                  htmlFor="default-checkbox"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Select All
                </Label>
              </th>
              <th className="p-3 text-center">Name</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Client</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#e7effc]">
              <td className="flex items-center gap-2 p-3 text-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                <Label
                  htmlFor="default-checkbox"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <FileImage className="w-8 h-8" />
                </Label>
              </td>
              <td className="p-3 text-center">Design</td>
              <td className="p-3 text-center">$100</td>
              <td className="p-3 text-center">John Doe</td>
              <td className="p-3 text-center">
                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                  Paid
                </span>
              </td>
              <td className="p-3 text-center">12/12/2021</td>
              <td className="p-3 text-center">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Assign to...
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Set due date...
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Tags className="mr-2 h-4 w-4" />
                          Apply label
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="p-0">
                          <Command>
                            <CommandInput
                              placeholder="Filter label..."
                              autoFocus
                            />
                            <CommandList>
                              <CommandEmpty>No label found.</CommandEmpty>
                              <CommandGroup>
                                {labels.map((label) => (
                                  <CommandItem
                                    key={label}
                                    value={label}
                                    onSelect={(value) => {
                                      setLabel(value)
                                      setOpen(false)
                                    }}
                                  >
                                    {label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Page