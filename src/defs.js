import { defineColumn, addTrait } from "./columns";
import { getUser } from "./users";

defineColumn(0, "datum pohybu ve tvaru rrrr-mm-dd+GMT", "Datum", "issued_at");
defineColumn(1, "velikost přijaté (odeslané) částky", "Objem", "amount");
defineColumn(2, "číslo protiúčtu", "Protiúčet", "account_id");
defineColumn(3, "číslo banky protiúčtu", "Kód banky", "bank_id");
defineColumn(4, "konstantní symbol", "KS", "ks");
defineColumn(5, "variabilní symbol", "VS", "vs");
defineColumn(6, "specifický symbol", "SS", "ss");
defineColumn(7, "uživatelská identifikace", "Uživatelská identifikace", "issuer_id");
defineColumn(8, "typ operace", "Typ pohybu", "type");
defineColumn(9, "oprávněná osoba, která zadala příkaz", "Provedl", "issuer");
defineColumn(10, "název protiúčtu", "Název protiúčtu", "account_name");
defineColumn(12, "název banky protiúčtu", "Název banky", "bank_name");
defineColumn(14, "měna přijaté (odeslané) částky dle standardu ISO 4217", "Měna", "currency");
defineColumn(16, "zpráva pro příjemce", "Zpráva pro příjemce", "msg");
defineColumn(17, "číslo příkazu", "ID pokynu", "id_task");
defineColumn(18, "upřesňující informace", "Upřesnění");
defineColumn(22, "unikátní číslo pohybu - 10 numerických znaků", "ID pohybu", "id");
defineColumn(25, "komentář", "Komentář", "desc");
defineColumn(26, "bankovní identifikační kód banky protiúčtu dle standardu ISO 9362", "BIC");
defineColumn(27, "bližší identifikace platby dle ujednání mezi účastníky platby", "Reference plátce");


addTrait("Datum", v => new Date((new Date(v.replace(/(\+0[0-9]00)/g, ""))).toDateString()));
addTrait("Provedl", v => getUser(v, false) || v);
addTrait("Protiúčet", v => String(v).replace(/[^0-9]/g, ""));
