-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumbnail` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `preco` VARCHAR(191) NOT NULL,
    `ingredientes` VARCHAR(191) NOT NULL,
    `disponibilidade` VARCHAR(191) NOT NULL,
    `volume` VARCHAR(191) NOT NULL,
    `outros` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
