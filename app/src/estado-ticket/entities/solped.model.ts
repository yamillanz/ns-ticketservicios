export default interface Solped {
	idSolpedCompras?: number,
	fechaAlta?: string,
	fechaAOrdenC?: any,
	descripcion?: any,
	idTicketServicio?: any,
	idEstadoActual?: any,
	estadoActual?: any,
	idSolpedPadre?: number,
	idConfigGerencia?: number,
	idAdmActivo?: number,
	idSegUsuario?: number,
	cant_diff_prove?: number,
	monto_total: number,
	idEmpresa?: number,
	monto_total_usd?: number,
	tasa_usd?: number,
	fecha_tasa_usd?: any,
	fecha_aprobo_presi?: any,
	formas_envio?: string,
	condiciones?: string,

	ticket? : any
}