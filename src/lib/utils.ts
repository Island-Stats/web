export enum Size {
	small = 32,
	medium = 64,
	large = 128,
	full = 512,
}

export function getPlayerHead(uuid: string, size: Size = Size.medium) {
  return `https://mc-heads.net/avatar/${uuid}/${size}.png`
}
