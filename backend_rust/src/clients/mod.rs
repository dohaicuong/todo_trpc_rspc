use std::sync::Arc;

pub mod prisma;

pub async fn new_prisma_client() -> Arc<prisma::PrismaClient> {
    Arc::new(prisma::new_client().await.unwrap())
}
