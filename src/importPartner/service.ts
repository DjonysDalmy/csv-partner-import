import axios, { AxiosRequestConfig } from "axios";
import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { fuConversor } from "../helpers/fuConversor";

interface IPartnerRequest {
    city: string,
    complement: string,
    country: string,
    district: string,
    fu: string,
    number: number,
    street: string,
    zipCode: string,
    document: string,
    email: string, 
    name: string,
    phoneNumber: string,
    invoicement: number, // 0 = semanal, 1 = quinzenal, 2 = mensal;
    invoicementType: number, // 0 = avulsa, 1 = escalonada, 2 = assinatura;
    disabled: boolean,
    partnerReference: string,
    password: string,
    password2: string,
    imageURL: string,
    imagePath: string,
    valueUF: string,
    fusList: string[],
    partnerId: string,
    haveContract: boolean,
    contractIsSigned: boolean,
    firstLogin: Date | undefined,
    createdAt: Date
    blocked: boolean
};

const importPartners = (file: Express.Multer.File): Promise<IPartnerRequest[]> => {
    return new Promise((resolve, reject) => {
        const partners: IPartnerRequest[] = [];
        const stream = fs.createReadStream(file.path);

        const parseFile = csvParse();

        stream.pipe(parseFile);

        parseFile.on("data", (line) => {
            const [id, name, document, phoneNumber, email, fu, zipCode, logradouro, street, district, number, complement, city, valueUF] = line;

            partners.push({
                city,
                complement: complement ? complement : "null",
                country: "Brasil",
                district,
                fu: fuConversor(fu),
                number: parseInt(number),
                street: `${logradouro} ${street}`,
                zipCode,
                partnerId: '',
                blocked: false,
                contractIsSigned: false,
                createdAt: new Date(),
                disabled: false,
                document: document.length == 14 ? document : `0${document}`,
                email,
                firstLogin: undefined,
                fusList: [''],
                haveContract: false,
                imagePath: '',
                imageURL: '',
                invoicement: 0,
                invoicementType: 0,
                name,
                partnerReference: id,
                phoneNumber: phoneNumber,
                valueUF: valueUF.slice(-2),
                password: `@A${document}_${zipCode}`,
                password2: `@A${document}_${zipCode}`
            });
        })
        .on("end", () => {
            fs.promises.unlink(file.path);
            resolve(partners);
        })
        .on("error", (err) => {
            reject(err);
        });
    });
};

const execute = async (file: Express.Multer.File, token: string): Promise<void> => {

    try{
        const partners: IPartnerRequest[] = await importPartners(file);

        const config: AxiosRequestConfig= {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };

        // for await(const partner of partners){
        //     await axios.post('https://us-central1-icetran-vendas-bdcba.cloudfunctions.net/api/partner', partner, config);
        // };

        for(let c = 0; c < 2; c++){
            console.log(partners[c]);
            await axios.post('https://us-central1-icetran-vendas-bdcba.cloudfunctions.net/api/partner', partners[c], config);
        };

        return;
    }catch(err){
        console.log(err.response.data);
        throw new Error(err);
    };
};

export { execute };