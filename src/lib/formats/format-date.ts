import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Retorna a distância de tempo legível entre a data informada e a data atual.
 * Ex.: "há 5 dias", "em 3 meses"
 * @param date Data como Date ou string
 */

export function formatDate(date: string | Date): string {
	return formatDistance(new Date(date), new Date(), {
		addSuffix: true,
		locale: ptBR,
	});
}
