const Feature = (props) => {
  const { recipes, recipe } = props;

  return (
    <section className="card overflow-hidden border-0 mt-0 mt-md-4">
      <div className="row g-0">
        <div className="col-lg-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
        <div className="col-lg-6"></div>
      </div>
    </section>
  );
};

export default Feature;
