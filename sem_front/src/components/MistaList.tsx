interface Props {
    items: String;
}

function MistaList() {
    return <>
        <h3>Revír</h3>
        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" defaultValue={'1'}>
            <option value="0">Velký</option>
            <option value="1">Postřední</option>
            <option value="2">Malý</option>
        </select>
        <h1>Lovné místa</h1>
        <div className="list-group">
            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Lovné místo 1</h5>
                </div>
                <p className="mb-1">Some placeholder content in a paragraph.</p>
                <button type="button" className="btn btn-success">Rezervovat</button>
            </a>
            <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Lovné místo 2</h5>
                    <small className="text-body-secondary">3 days ago</small>
                </div>
                <p className="mb-1">Some placeholder content in a paragraph.</p>
                <small className="text-body-secondary">And some muted small print.</small>
            </a>
        </div>
    </>
}

export default MistaList