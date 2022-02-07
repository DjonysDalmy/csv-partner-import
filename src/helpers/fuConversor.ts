const fuConversor = (Uf: string) => {
    switch(Uf){
        case "Acre":
            Uf = "AC";
            break
        case "Alagoas":
            Uf = "AL";
            break
        case "Amapá":
            Uf = "AP";
            break
        case "Amazonas":
            Uf = "AM";
            break
        case "Bahia":
            Uf = "BA";
            break
        case "Ceará":
            Uf = "CE";
            break
        case "Espírito Santo":
            Uf = "ES";
            break
        case "Goiás":
            Uf = "GO";
            break
        case "Maranhão":
            Uf = "MA";
            break
        case "Mato Grosso":
            Uf = "MG";
            break
        case "Mato Grosso do Sul":
            Uf = "MS";
            break
        case "Minas Gerais":
            Uf = "MG";
            break
        case "Pará":
            Uf = "PA";
            break
        case "Paraíba":
            Uf = "PB";
            break  
        case "Paraná":
            Uf = "PR";
            break 
        case "Pernambuco":
            Uf = "PE";
            break 
        case "Piauí":
            Uf = "PI";
            break
        case "Rio de Janeiro":
            Uf = "RJ";
            break 
        case "Rio Grande do Norte":
            Uf = "RN";
            break 
        case "Rondônia":
            Uf = "RO";
            break
        case "Roraima":
            Uf = "RR";
            break 
        case "Santa Catarina":
            Uf = "SC";
            break 
        case "São Paulo":
            Uf = "SP";
            break  
        case "Sergipe":
            Uf = "SE";
            break  
        case "Tocantis":
            Uf = "TO";
            break  
        case "Distrito Federal":
            Uf = "DF";
            break  
        case "Rio Grande do Sul": 
            Uf = "RS";
            break
        default:
            Uf = "Erro ao identificar UF";                 
    };
    return Uf;
};

export { fuConversor };