type Cities = {
  label: string;
  value: string;
};

export async function getCities() {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome"
  );
  const data: any[] = await response.json();

  const cities: Cities[] = data.map((city) => ({
    value: `${city.nome} / ${city.microrregiao?.mesorregiao?.UF?.sigla}`,
    label: `${city.nome} / ${city.microrregiao?.mesorregiao?.UF?.sigla}`,
  }));

  return cities;
};
