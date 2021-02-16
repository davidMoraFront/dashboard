import { Address } from "./address";
import { Company } from "./company";

export class Employee {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    address: Address;
    company: Company;
}
