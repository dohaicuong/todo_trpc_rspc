mod clients;

mod api;
mod router;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    let db = clients::new_prisma_client().await;
    let api = api::new().build().arced();

    let router = router::new(api, db);
    let addr = "0.0.0.0:4000".parse::<std::net::SocketAddr>().unwrap();

    println!("listening on http://{addr}/rspc");
    axum::Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}
