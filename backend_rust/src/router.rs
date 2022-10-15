use std::sync::Arc;

use axum::routing;
use rspc::Router;
use tower_http::cors;

use crate::{clients::prisma, api::Ctx};

pub fn new(
    api: Arc<Router<Ctx>>,
    db: Arc<prisma::PrismaClient>,
) -> axum::Router {
    axum::Router::new()
        .route("/", routing::get(|| async { "Hello 'rspc'!" }))
        .route("/rspc/:id", api
            .endpoint(move || Ctx {
                db: db.clone()
            })
            .axum()
        )
        .layer(
            cors::CorsLayer::new()
                .allow_methods(cors::Any)
                .allow_headers(cors::Any)
                .allow_origin(cors::Any)
        )
}
