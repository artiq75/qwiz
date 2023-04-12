import { InputField, Select } from '../components/Tools/Tools'

export default function Custom() {
  const handleSubmit = function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data)
  }

  return (
    <main className="container-md custom">
      <h2 className="txt-center">Partie Personnaliser</h2>
      <form className="card" onSubmit={handleSubmit}>
        <p>
          <Select name="category" label="Catégories">
            <option value="">Toute les catégories</option>
            <option value="culture">Culture</option>
            <option value="geographie">Géographie</option>
            <option value="gastronomie">Gastronomie</option>
          </Select>
        </p>
        <p>
          <InputField
            name="amount"
            label="Nombre de questions"
            defaultValue={10}
          />
        </p>
        <button className="btn primary" type="submit">
          Créer la partie
        </button>
      </form>
    </main>
  )
}
